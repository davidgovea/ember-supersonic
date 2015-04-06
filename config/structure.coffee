# Read more about app structure at http://docs.appgyver.com

module.exports =

  rootView:
    location: "http://localhost/index.html#/"

  drawers:
    left:
      id: "leftDrawer"
      location: "http://localhost/index.html#/left-drawer"
      showOnAppLoad: false
    options:
      animation: "swingingDoor"

  tabs: [
    {
      title: "Index"
      id: "index"
      location: "http://localhost/index.html#/"
    }
    {
      title: "Settings"
      id: "settings"
      location: "http://localhost/index.html#/settings"
    }
    {
      title: "Internet"
      id: "internet"
      location: "http://google.com" # URLs are supported!
    }
  ]

