import React from 'react'

import Events from "./Events";
import MarketItems from "./MarketItems";

function ContentLeft() {
  return (
    <aside className="main-left">
      <Events />
      <MarketItems />
    </aside>
  )
}

export default ContentLeft;