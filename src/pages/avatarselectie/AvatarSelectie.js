import '../../styles/components/_avatarSelectie.css';
import Loading from '../../components/Loading';
import { GET_AVATARS } from '../../graphQL/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { UPDATE_SPELER_AVATAR, GET_USER_NAME } from '../../graphQL/queries';
import { useAuth0 } from '@auth0/auth0-react';



export default function AvatarSelectie() {
    const { user } = useAuth0();
    const { data: avatarData, loading: avatarLoading, error: avatarError } = useQuery(GET_AVATARS);
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_NAME, {
        variables: { auth0_user_id: user?.sub }

    });

    const [updateSpelerAvatar] = useMutation(UPDATE_SPELER_AVATAR);
    const [selectedAvatar, setSelectedAvatar] = useState();

    if (avatarLoading) return <Loading />;
    if (avatarError) return <p>Error: {avatarError.message}</p>;


    function clickAvatar(avatarId) {

        const userId = user?.sub;
        setSelectedAvatar(avatarId);
        updateSpelerAvatar({ variables: { auth0_user_id: userId, avatarId } })
            .then(response => {
                console.log("Avatar updated successfully:", response.avatarData);
                setSelectedAvatar(avatarId);
            })
            .catch(error => {
                console.error("Error updating avatar:", error);
            });
    }

    function isUserAvatar(spelers) {
        const userId = userData?.speler?.id;
        return spelers.some(speler => speler.id === userId);
    }

    return (
        <div className='avatar-selectie-container'>
            <h1>KIES JE AVATAR</h1>
            <div className="grid-container">
                {avatarData.avatars.map((avatar) => (
                    <div
                        className={`grid-item ${isUserAvatar(avatar.spelers) ? 'selected-avatar' : ''}`}
                        key={avatar.id}
                    >
                        <img
                            src={avatar.image.url}
                            alt=""
                            onClick={() => clickAvatar(avatar.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
} 