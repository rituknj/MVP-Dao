import React from 'react'
import { useRouteMatch } from 'react-router-dom'

function Hooks() {
    const url = useRouteMatch()
    return url
}

export default Hooks
