import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinnner';

const ProfileGithub = ({
  username,
  getGithubRepos,
  profile: { repos, loading },
}) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {loading || repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo, index) => (
          <div key={repo.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}

      <div className='repo bg-white p-1 my-1'>
        <div>
          <h4>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              Repo Two
            </a>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            laborum!
          </p>
        </div>
        <div>
          <ul>
            <li className='badge badge-primary'>Stars: 44</li>
            <li className='badge badge-dark'>Watchers: 21</li>
            <li className='badge badge-light'>Forks: 25</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
