<p align="center"><img style="width: 50%;" src="https://github.com/Reda-codes/ecolio/blob/main/frontend/public/logo-no-background.png?raw=true"/></p><br>
<br>
<br>
<br>

# <p>About Ecolio</p>
<br>
Ecolio is an innovative school CMS MVP designed to help schools manage their students, instructors, and staff members.

Developed with a great passion, Ecolio empowers schools to create and manage user accounts, including instructors and students, and create classes for them that they participate in.

The idea came up to me when I was randomly searching for different CMSs and found out that for schools there isn't that much solutions addressed to this issue so for my [Holberton School](https://www.holbertonschool.com) and [ALX](https://www.alxafrica.com) Portfolio Project I decided to create Ecolio A platform for every school.

The MVP offers features such as announcement sharing, homework assignments, and individual notes for students, allowing instructors to keep track of their students' progress.

The Ecolio team plans to add more features in the future, including class attendance management, file sharing, in-app messaging, a school calendar, and administration contact.

Parent accounts will also be included, enabling parents to stay updated on their child's academic progress.

With Ecolio, schools can streamline their administrative tasks and focus on providing the best possible education for their students.

Ecolio is an essential tool for schools of all sizes and is sure to make a significant impact on the education industry.
<br>
<br>
<br>

# <p>Project Structure</p>

<br>
<p align="center">
  <img style="width: 70%;" src="https://i.imgur.com/kxS1pQR.jpg"/>
</p>
<br>

The app consists of multiple microservices that work together to deliver a fully functioning product with minimal technical debt.

### Information flow
when a user signs in, the React client sends the user's credentials to Auth0 to verify if the user exists. If the user is verified, Auth0 provides the client with an access token that can be used for subsequent requests to the API. This eliminates the need for the client to obtain a separate access token for the API since the same access token provided by Auth0 can be used for the API.
<br>
<br>
<br>

# <p>Project Deployment</p>

<br>
<p align="center">
  <img style="width: 70%;" src="https://i.imgur.com/ybCYGBC.png"/>
</p>
<br>

### Deployment process
The project deployment consist of two automated Jobs. Once a repository is updated we use github action to deploy our new code following the steps bellow:
1. creating the Docker image
   -  Building the Docker Image
   -  Push the image to docker Hub
2. Deploying to server
   -  Log to our server
   -  Pull the new image
   -  Stop the container
   -  Delete the container
   -  Run a new one with the newly pulled image
<br>
<br>
<br>

# <p>Deploy your own Ecolio</p>
### To deploy you own ecolio Follow the guide provided in each service Folder:
- [Deploy The BackEnd API](https://github.com/Reda-codes/ecolio/blob/main/backend/README.md)
- [Deploy The FrontEnd client](https://github.com/Reda-codes/ecolio/blob/main/frontend/README.md)
