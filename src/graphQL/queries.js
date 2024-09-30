import { gql } from "@apollo/client";

export const CHANGEUSERNAME = gql `
    mutation MyMutation {
        updateSpeler(
            data: {avatar: "Nicele Jeanne"}
            where: {auth0_user_id: "auth0|663650e84e983e7a58741dfd"}
        ) {
            achternaam
            voornaam
        }
    }
`

export const GET_SPELER_NAMES = gql`
  query GetSpelers {
    spelers {
      voornaam
      achternaam
    }
  }
`;

export const GET_USER_NAME = gql`
  query GetUserName ($auth0_user_id: String!) {
    speler(where: {auth0_user_id: $auth0_user_id}) {
      id
      voornaam
      achternaam
      username
      auth0_user_id
    } 
  }
`

export const CHANGE_USERNAME = gql `
  mutation ChangeUsername($auth0_user_id: String!, $username: String!) {
    updateSpeler(
        where: { auth0_user_id: $auth0_user_id }
        data: { username: $username }
    ) {
        username
        voornaam
        achternaam
    }
    publishSpeler(where: { auth0_user_id: $auth0_user_id }) {
      id
    }
  }
`;

export const CHANGE_XP = gql `
  mutation ChangeXP($auth0_user_id: String!, $xp: Int!) {
    updateSpeler(
        where: { auth0_user_id: $auth0_user_id }
        data: { xp: $xp }
    ) {
        username
        id
    }
    publishSpeler(where: { auth0_user_id: $auth0_user_id }) {
      id
      xp
    }
  }
`;

export const UPDATE_SPELER_AVATAR = gql`
  mutation UpdateSpelerAvatar($auth0_user_id: String!, $avatarId: ID!) {
    updateSpeler(
      where: { auth0_user_id: $auth0_user_id }
      data: { avatar: { connect: { id: $avatarId } } }
    ) {
      id
      achternaam
      auth0_user_id
      username
      voornaam
      avatar {
        id
      }
    }
    publishSpeler(where: { auth0_user_id: $auth0_user_id }) {
      id
    }
  }
`;


export const GET_AVATARS = gql`
  query GetAvatars {
    avatars {
      image {
        url
      }
      spelers {
        id
      }
      id
      color
    }
  }
`

export const GET_USER_PICTURE = gql `
  query GetUserAvatar($auth0_user_id: String!) {
    speler(where: {auth0_user_id: $auth0_user_id}) {
      avatar {
        image {
          url
        }
      }
    }
  }
`

export const GET_ALL_NIEUWSITEMS = gql`
  query MyQuery {
    nieuwsItems {
      id
      nieuwsAfbeelding {
        url
      }
      nieuwsDatum
      nieuwsUrl
      titel
    }
  }
`

export const GET_PRESTATIES_FROM_USER = gql `
  query GetBadges($auth0_user_id: String!) {
    prestaties(where: {spelers_every: {auth0_user_id: $auth0_user_id}}) {
      name
      image {
        url
      }
    }
  }
`

export const GET_PRESTATIES_TO_BE_ACHIEVED = gql `
  query GetBadges($auth0_user_id: String!) {
    prestaties(where: {spelers_none: {auth0_user_id: $auth0_user_id}}) {
      name
      image {
        url
      }
    }
  }
`

export const GET_ALL_RANKS = gql `
query MyQuery {
  ranks {
    level
    title
  }
}
`;

export const GET_RANK_SPELER = gql `
query MyQuery($auth0_user_id: String!) {
  ranks(where: {spelers_every: {auth0_user_id: $auth0_user_id}}) {
    title
    level
  }
}
`;

export const GET_XP = gql `
query GetXP($auth0_user_id: String!) {
  speler(where: {auth0_user_id: $auth0_user_id}) {
    xp
  }
}
`;



//dit is voor één item per keer 



// export const GET_ALL_NIEUWSITEMS = gql`
// query MyQuery($id: ID!) {
//   nieuwsItem(where: {id: $id}) {
//     nieuwsAfbeelding {
//       url
//     }
//     nieuwsDatum
//     nieuwsUrl
//     titel
//   }
// }
// `

