# Flexy/i Learn

<br>

## Description

The online platform that allows you to learn in a flexible and personalized way with courses taught by experts in different areas, from the comfort of your home and at your own pace, so that you can achieve your goals and continue to grow personally and professionally.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start creating and managing my courses.
- **User Type:** You can be a instructor or a student.
- **Login:** As a user I can login to the platform so that I can start creating and managing my courses
- **Logout:** As a user I can logout from the platform so no one else can modify my information
- **Search course** As a user I can search courses
- **Student:** As a student you can do the following actions...
- **Add comments:** Add a testimonials to the course or instructor
- **Add Notes:** Add notes
- **Delete Notes** Delete Notes
- **Change Status of Notes** As a user I can change the status of my notes
- **Check profile** As a user I can check my profile and edit it
- **Instructor:** As a instructor you can do the following actions...
- **Add courses** As a instructor you can add
- **Edit courses** As a instructor you can edit courses

## Backlog

- Rating for instructor and course
- Login With Google Account
- Delete/Desactive User
- Chat Online
- Online Streaming Class
- Real Payment, donations
- Testimonials in Instructor
- Add Search by Instructor, and refac Search component
- Add Demo and Resources to Course
- Add Admin Panel
- ...

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                          | Component                         | Permissions                             | Behavior                                                     | await User.findByIdAndDelete(newUser.\_id); |
| ----------------------------- | --------------------------------- | --------------------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| `/`                           | SplashPage                        | public `<Route>`                        | Home page                                                    |
| `/signup`                     | SignupPage                        | anon only `<>`                          | Signup form, link to login, navigate to login after signup   |
| `/login`                      | LoginPage                         | anon only `<>`                          | Login form, link to signup, navigate to homepage after login |
| `/logout`                     | n/a                               | user only `<isInstructor or isStudent>` | Navigate to homepage after logout, expire session            |
| `/`                           | NavBar, CourseList, AddCourse     | instructor only `<isInstructor`         | Shows all courses and add it                                 |
| `/`                           | NavBar, CourseList, ListOfProduct | student only `<isStudent`               | Shows all courses                                            |
| `/profile`                    | NavBar, Edit Profile              | user only `<isInstructor or isStudent>` | Shows profile, edit it, my courses                           |
| `/courses/details/:courseId`  | NavBar, ElementList, FooterBar    | user only `<isInstructor or isStudent>` | Shows a course details                                       |
| `/courses/add`                | Course Form To add                | isInstructor only `<isInstructor >`     | Add a new Course                                             |
| `/courses/edit/:id`           | EditCourse                        | isInstructor only `<isInstructor`       | Edit your course                                             |
| `/courses/lecture/:idLecture` | VideoPlataform                    | student only `< isStudent>`             | Watch the video of the lecture                               |
| `/notes`                      | NoteList                          | isStudent only ` isStudent>`            | Check your notes, andd and delete                            |
| `/payment-success`            | PaymentSuccess                    | user only `<isInstructor or isStudent>` | Paymente completed                                           |
| `/error`                      | Error500                          | user only `<isInstructor or isStudent>` | Shows all tv series ERROR 404                                |
| `*`                           | Error in other routes             | user only `<>`                          | Shows ERROR 404                                              |

## Components

- VideoPlayer

- Nav

- AddNote

- BackBtn

- Comments

- CoursePreview

- UserInfo

- SearchCourses

- ElementInfo

- Stats

## Services

- Auth Service

  - signupService,
  - loginService,
  - verifyService

- Courses Service
  - addCoursesService,
  - allCoursesService,
  - allMyCoursesService,
  - editCoursesService,
  - oneCoursesService,
  - deleteCoursesService,
  - verifyService,
  -
- Payment Service

  - createPaymentIntentService,
  - updatePaymentIntentService,
  - myProductsService

- Student Service
  - getCartProductsService,
  - getMyProductsService,
  - addToCartService,
  - addProductsToMyCourses,
  - removeProductFromCartServices
- Notes Service

  - API for games
  - API for series
  - API for films

- User Service

  - getUserService,
  - getInstructorService,
  - getStudentService,
  - editUserService,
  - editInstructorService,
  - editStudentService,

- Testimonials Service

  - allTestimonialService,
  - addTestimonialService,
  - deleteTestimonialService,
  - authorTestimonialsService,

- Lectures Service

  - API for games
  - API for series
  - API for films

- Upload Service
  - uploadImageService
    <br>

# Server / Backend

## Models

Course model

```javascript
  {
    title: {
      type: String,
      required: true,
      maxLength: 100
    },
    description: {
      type: String,
      required: false,
      maxLength: 700
    },
    topic: {
      type: String,
      enum: ["programing", "healthy", "psychology", "marketing"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    lectures: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    coverImg_url: {
      type: String,
      default:
        "https://uploads-ssl.webflow.com/63723fe799096ad12312edc2/63c6be2a0b0e6f6801c9fdfc_59.png",
    },
    level: {
      type: String,
      requiered: true,
      enum: ["beginner", "intermediate", "advanced", "expert", "all"],
    },
    totalDuration: Number,
    rate: Number,
  }
```

User model

```javascript
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: false,
      maxLength: 100
    },
    last_name: {
      type: String,
      required: false,
      maxLength: 100
    },
    description: {
      type: String,
      required: false,
      maxLength: 700
    },
    profileImg_url: {
      type: String,
      default: "https://www.computerhope.com/jargon/g/guest-user.png",
    },
  }
```

```
Others here:  [All Models](https://github.com/jdluis/flexi-learn-server/tree/main/models)
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                             | Request Body                | Success status | Error Status | Description                                                                                                                     |
| ----------- | ------------------------------- | --------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/api/auth/signup    `          | Saved session               | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/api/auth/login`               | {name, email, password}     | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| GET         | `/api/auth/verify`              | {username, password}        | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`                  | (empty)                     | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/courses`                  | {platform, title, type, id} |                | 400          | Show all Courses                                                                                                                |
| GET         | `/api/courses/my-courses`       |                             |                | 400          | Show my courses elements                                                                                                        |
| GET         | `/api/courses/:id`              |                             |                |              | Show film elements                                                                                                              |
| POST        | `/api/courses/add`              |                             |                |              | Show games elements                                                                                                             |
| PATCH       | `/api/courses/:id/edit`         |                             | 201            | 400          | Edit specific Course element                                                                                                    |
| DELETE      | `/api/courses/:id/delete`       |                             | 200            | 400          | Delete Course element                                                                                                           |
| GET         | `/api/courses/:id/lectures`     |                             | 201            | 400          | Get Lectures element                                                                                                            |
| POST        | `/api/courses/:id/lectures/add` |                             |                | 400          | Add lecture elements                                                                                                            |
| GET         | `/api/lectures`                 |                             |                |              | Show lectures elements                                                                                                          |
| PATCH       | `/api/lectures/:idLecture/edit` |                             |                |              | Update lectures elements                                                                                                        |

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/CZXpBLce/flexilearn)
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/jdluis/flexi-learn-client)

[Server repository Link](https://github.com/jdluis/flexi-learn-server)

[Deployed App Link](https://flexylearn.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/16nan5Nt2CUldqRWyDescXGfPS3aeR6mFK2id-29xlvc/edit#slide=id.p)
