import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type PeopleTableProps = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams<{ personSlug: string }>();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === personSlug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: getSearchWith(searchParams, {}),
                  }}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  person.mother ? (
                    <Link
                      className="has-text-danger"
                      to={{
                        pathname: `/people/${person.mother.slug}`,
                        search: getSearchWith(searchParams, {}),
                      }}
                    >
                      {person.mother.name}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  person.father ? (
                    <Link
                      to={{
                        pathname: `/people/${person.father.slug}`,
                        search: getSearchWith(searchParams, {}),
                      }}
                    >
                      {person.father.name}
                    </Link>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
