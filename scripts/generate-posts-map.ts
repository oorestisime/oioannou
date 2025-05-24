import fs from "fs"
import { getSortedPostsData } from "~/lib/blog"

const posts = getSortedPostsData(true)

fs.writeFileSync("app/lib/posts.json", JSON.stringify(posts))
