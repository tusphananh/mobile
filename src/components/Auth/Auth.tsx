import Map from 'components/DashBoard/Map'
import React, { FC } from 'react'
import { useAuthContext } from '../../contexts/authContext'

const Auth: FC = () => {
  const { authState } = useAuthContext()

  return <Map></Map>
}

export default Auth
