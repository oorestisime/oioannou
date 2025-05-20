import { redirect, useLocation } from "react-router"

function Redirect() {
  const location = useLocation()
  return redirect(`/blog${location.pathname}`, 302)
}
