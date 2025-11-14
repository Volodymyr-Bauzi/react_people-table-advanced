import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

const getFilteredPeople = (
  people: Person[],
  { sex }: { sex: Person['sex'] | null },
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  return filteredPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex') as Person['sex'] | null;

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const aggregatedPeople = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer.find(
            ({ name }) => name === person.motherName,
          ),
          father: peopleFromServer.find(
            ({ name }) => name === person.fatherName,
          ),
        }));

        setPeople(aggregatedPeople);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = getFilteredPeople(people, {
    sex: sexFilter,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters selectedSex={sexFilter} />}
          </div>

          <div className="column">
            <div className="box table-container">
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {people?.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {false && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  <PeopleTable people={filteredPeople} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
