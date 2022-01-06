const auth = require("../../database/auth");
const admin = require("../../database/admin");
const db = require("../../database/db");

const { Router } = require('express');
const router = Router()

router.post("/", async (req, res) => {

   if (Array.isArray(req.body)) {
      importUsers(req.body, res)
   } else {
      insertUser(req.body, res)
   }
})

async function importUsers(users, res) {
   //validate email first in client
   const fails = [];

   const allUsers = await admin.collection("users").orderBy("timestamp", "desc").get()
   const data = allUsers.docs[0].data()

   for (let i = 0; i < users.length; i++) {

      const user = users[i];
      user.timestamp = new Date().getTime();

      const { email, name, password } = user;
      const userCredential = { email, password, displayName: name };
      let errPhase = -1;
      let newUser;

      try {
         newUser = await auth.createUser(userCredential)
         errPhase = 0
         delete user.role, delete user.department, delete user.work_position, delete user.password;
         if (!data.count) {
            user.count = 1;
         } else {
            user.count = data.count + 1;
         }
         await admin.collection('users').doc(newUser.uid)
            .set(user)
         data.count++;
      } catch (err) {
         fails.push({ email, message: err.message })
      }
   }

   if (fails.length > 0) {
      res.status(500).json(fails)
   } else {
      res.json("Success");
   }
}


async function handleDelete(id) {
   await admin.collection("feedback").where("from", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })

   await admin.collection("feedback").where("to", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })

   await admin.collection("issue_comments").where("from", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })

   await admin.collection("issues").where("user_id", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })

   await admin.collection("logs").where("userId", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })

   await admin.collection("messages").where("from", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })

   await admin.collection("messages").where("to", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })

   await admin.collection("tasks").where("created_by", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })

   await admin.collection("tasks_users").where("assign_by", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })


   await admin.collection("tasks_users").where("assign_to", "==", id).get().then(snapshot => {
      snapshot.forEach(doc => {
         doc.ref.delete()
      })
   })

}


router.put("/", async (req, res) => {
   const user = req.body;
   const id = user.id
   delete user.role, delete user.department, delete user.work_position, delete user.id;
   admin.collection("users").doc(id).set(user)
      .then(() => res.json(user))
      .catch(err => res.status(500).json(err))
})

router.delete("/:id", async (req, res) => {
   const { id } = req.params;
   auth.deleteUser(id).then(() => {
      admin.collection("users").doc(id).delete()
         .then(async (result) => {
            await handleDelete(id)

            res.json(result)
         })
         .catch(err => res.status(500).json(err))
   })
      .catch(err => res.status(500).json(err))
})


async function insertUser(user, res) {
   const { email, password } = user;
   const userCredential = { email, password, displayName: user.name };
   user.timestamp = new Date().getTime();
   const users = await admin.collection("users").orderBy("timestamp", "desc").get()

   const data = users.docs[0].data()
   if (!data.count) {
      user.count = 1;
   } else {
      user.count = data.count + 1;
   }


   auth.createUser(userCredential)
      .then((u) => {
         delete user.role, delete user.department, delete user.work_position, delete user.password;
         admin.collection("users")
            .doc(u.uid)
            .set(user)
            .then(() => res.json(user))
            .catch(err => res.status(500).json(err))
      })
      .catch(err => res.status(500).json(err))
}

module.exports = router