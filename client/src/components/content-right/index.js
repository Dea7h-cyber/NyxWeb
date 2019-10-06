import React, { Fragment } from 'react'

import UserArea from "./UserArea";

function ContentRight() {
  return (
    <aside className="main-right">
      <Fragment>
        <UserArea />
      </Fragment>
    </aside>
  )
}

export default ContentRight;