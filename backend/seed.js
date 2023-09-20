import { Person, Comment, Post} from "./models/schema.js";


async function seed() {

  console.log("seed executed")

  await Person.deleteMany()
  await Comment.deleteMany()
  await Post.deleteMany()


  const jack = await Person.create({name: "Jack"})
  const rocky = await Person.create({name: "Rocky"})

  const post1 = await Post.create({
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Mauris fermentum risus non libero imperdiet, eu tincidunt ligula 
    sollicitudin. Vestibulum non lacus ante. Nulla pharetra tellus 
    turpis, ac mattis libero porta vitae. Phasellus ut sagittis augue. 
    Sed lobortis quam et nulla pulvinar, id tincidunt neque fermentum. 
    Donec ipsum leo, facilisis at nulla id, suscipit mollis dui. Duis
    cursus mattis viverra. Praesent posuere diam id est vulputate, ut 
    feugiat ligula fermentum. Praesent ut finibus ligula.`,
    title: "Post 1",
    user: rocky.id,
  })


  const comment1 = await Comment.create({
    body: "I am a root comment",
    user: {
      id: jack.id,
      name: "jack"
    },
    createdAt: Date.now(),
    parentId: null
  })
  post1.comments.push(comment1.id);
  

  const comment2 = await Comment.create({
    body: "I am a nested comment",
    parentId: comment1.id,
    user: {
      id: rocky.id,
      name: "Rocky" 
    },
    createdAt: Date.now()
  })
  post1.comments.push(comment2.id);

  const comment3 = await Comment.create({
    body: "I am a root comment",
    user: {
      id: rocky.id,
      name: "Rocky"
    },
    createdAt: Date.now(),
    parentId: null

  })
  post1.comments.push(comment3.id);
  post1.save()
}

export default seed