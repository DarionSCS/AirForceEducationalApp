import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { GET_PRESTATIES_FROM_USER,GET_PRESTATIES_TO_BE_ACHIEVED } from '../../graphQL/queries';
import { useQuery } from '@apollo/client';
import "../../styles/components/_badges.css";


function Badges() {
    const { user } = useAuth0();

    const { data, loading, error } = useQuery(GET_PRESTATIES_FROM_USER, {
      variables: { auth0_user_id: user?.sub }
    });

    const { data: dataNotAchieved, loading: naLoading, error: naError} = useQuery(GET_PRESTATIES_TO_BE_ACHIEVED, {
      variables: { auth0_user_id: user?.sub }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    if (naLoading) return <p>Loading...</p>;
    if (naError) return <p>Error: {naError}</p>
    return (
      <div className='badges'>
        {data.prestaties.map(badge => (
          <img src={badge.image.url} alt="img" />
        ))}
        {dataNotAchieved.prestaties.map(badge => (
            <div>
                <img src={badge.image.url} className='not-achieved'/>
            </div>
        ))}
      </div>
    )
}

export default Badges;