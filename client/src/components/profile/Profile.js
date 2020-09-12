import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByID } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinnner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { debug } from 'request';

const Profile = ({
  match,
  getProfileByID,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID]);
  return (
    <Fragment>
      {profile === null || loading === true ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/developers' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div class='profile-exp bg-white p-2'>
              <h2 class='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                profile.experience.map((experience) => (
                  <ProfileExperience
                    key={experience._id}
                    experience={experience}
                  />
                ))
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
            <div class='profile-edu bg-white p-2'>
              <h2 class='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                profile.education.map((education) => (
                  <ProfileEducation key={education._id} education={education} />
                ))
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
