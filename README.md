# ToDoListFrontEnd

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# 📋 Todo List Application

A modern, responsive Todo application built with Angular 20 and ASP.NET Core API. Features a beautiful purple-themed UI with full CRUD operations for managing your daily tasks.

## 🎯 Features

- ✅ **Create new todos** with title and description
- ✅ **Mark todos as completed** with a single click
- ✅ **Real-time UI updates** after each operation
- ✅ **Beautiful responsive design** with purple gradient theme
- ✅ **Form validation** with user-friendly error messages
- ✅ **RESTful API integration** with ASP.NET Core backend

## 🛠️ Technologies Used

- **Frontend**: Angular 20, TypeScript, SCSS
- **Backend**: ASP.NET Core Web API
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **HTTP Client**: Angular HttpClient for API communication

## 📋 Prerequisites

Before running this application, ensure you have the following installed on your machine:

### Required Software
1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: Open terminal/command prompt and run:
     ```bash
     node --version
     npm --version
     ```

2. **Git** (for cloning the repository)
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

3. **Angular CLI** (will be installed with npm)
   ```bash
   npm install -g @angular/cli
   ```

4. **Backend API** (ASP.NET Core)
   - Ensure your backend API is running on `https://localhost:7211`
   - The API should have the following endpoints available:
     - `GET /api/ToDoList/items-list` - Get all todos
     - `POST /api/ToDoList/items` - Create new todo
     - `PUT /api/ToDoList/change-status` - Update todo status

## 🚀 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone [YOUR-GITHUB-REPO-URL]
cd ToDoListFrontEnd
```

### Step 2: Install Dependencies
```bash
npm install
```
*This command will install all required packages. It may take 2-3 minutes depending on your internet connection.*

### Step 3: Verify Environment Configuration
Check that the API URL is correctly configured in `src/app/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7211/api/ToDoList'
};
```

**Important**: Make sure this URL matches where your backend API is running.

### Step 4: Start the Development Server
```bash
npm start
```
*Alternative command:*
```bash
ng serve
```

### Step 5: Access the Application
- The application will automatically open in your default browser at: **http://localhost:4200**
- If it doesn't open automatically, manually navigate to this URL

## 🎮 Using the Application

### Navigation
The application has two main pages accessible via the navigation bar:
- **Todo List** - View and manage existing todos
- **Add Todo** - Create new todo items

### Adding a New Todo
1. Click **"Add Todo"** in the navigation
2. Fill out the form:
   - **Title**: Required field (max 100 characters)
   - **Description**: Optional field (max 500 characters)
   - **Status**: Checkbox to mark as completed (defaults to unchecked)
3. Click **"Add Todo Item"** to save
4. Success message will appear and form will clear

### Managing Todos
1. Navigate to **"Todo List"** page
2. View all your todos with their current status
3. **Mark as Completed**: Click on any orange "Pending" badge to mark the todo as completed
4. Completed todos will show with a purple "Completed" badge

### Visual Indicators
- **🟠 Orange "Pending" badges**: Clickable, indicates incomplete todos
- **🟣 Purple "Completed" badges**: Indicates completed todos
- **Loading states**: Shows while fetching data from API
- **Error messages**: Displays if API calls fail

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Port 4200 Already in Use
If you see "Port 4200 is already in use":
```bash
# On Windows:
netstat -ano | findstr :4200
taskkill /F /PID [PROCESS_ID_FROM_ABOVE_COMMAND]

# On Mac/Linux:
lsof -ti:4200 | xargs kill -9

# Then restart the application:
npm start
```

#### API Connection Issues
If you see API-related errors:
1. **Verify Backend is Running**: Ensure your ASP.NET Core API is running on `https://localhost:7211`
2. **Check API Endpoints**: Test the API endpoints directly in a browser or Postman
3. **CORS Configuration**: Ensure your backend API has CORS properly configured for `http://localhost:4200`
4. **Network Issues**: Check firewall settings that might block local connections

#### Compilation Errors
If you encounter TypeScript or Angular compilation errors:
```bash
# Clean installation
rm -rf node_modules package-lock.json .angular
npm install
npm start
```

#### Browser Cache Issues
If changes aren't reflecting:
1. Hard refresh the browser: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
2. Open developer tools (F12) and right-click refresh button → "Empty Cache and Hard Reload"

## 📁 Project Structure

```
ToDoListFrontEnd/
├── src/
│   ├── app/
│   │   ├── add-todo/           # Add todo component
│   │   ├── todo-list/          # Todo list component  
│   │   ├── services/           # API services
│   │   ├── models/             # TypeScript interfaces
│   │   ├── environments/       # Environment configurations
│   │   ├── app.html            # Main app template
│   │   ├── app.ts              # Main app component
│   │   └── app.routes.ts       # Routing configuration
│   ├── styles.scss             # Global styles
│   └── main.ts                 # Application bootstrap
├── package.json                # Dependencies and scripts
├── angular.json               # Angular CLI configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🌐 API Integration

The application expects the following API endpoints:

### GET `/api/ToDoList/items-list`
Returns array of todos:
```json
[
  {
    "id": "string",
    "title": "string", 
    "description": "string",
    "isCompleted": boolean
  }
]
```

### POST `/api/ToDoList/items`
Creates new todo:
```json
{
  "title": "string",
  "description": "string", 
  "isCompleted": boolean
}
```

### PUT `/api/ToDoList/change-status`
Updates todo status:
```json
{
  "itemId": "string",
  "isCompleted": boolean
}
```

## 🎨 Customization

### Changing the Theme Color
To change from purple to another color:
1. Edit `src/styles.scss`
2. Update the CSS variables in `:root`:
```scss
:root {
  --primary-color: #your-color;
  --dark-color: #your-dark-shade;
  --light-color: #your-light-shade;
}
```

### Environment Configuration
- **Development**: Edit `src/app/environments/environment.ts`  
- **Production**: Edit `src/app/environments/environment.prod.ts`

## 📊 Expected Application Behavior

### Loading States
- ⏳ "Loading todos..." appears while fetching data from API
- ⏳ Form shows loading state while submitting new todos

### Success States  
- ✅ "Todo item added successfully!" message after creating todos
- ✅ Immediate UI update when marking todos as completed
- ✅ Smooth animations and transitions

### Error Handling
- ❌ Form validation errors for required fields
- ❌ API error messages if backend is unavailable
- ❌ Network timeout handling

## 🆘 Support & Contact

If you encounter any issues:

1. **Check Browser Console**: Press F12 and look for error messages in the Console tab
2. **Verify Prerequisites**: Ensure Node.js, npm, and the backend API are properly installed and running
3. **Check Network**: Verify both frontend and backend are accessible
4. **Review API Responses**: Use browser developer tools to inspect API calls in the Network tab

### Debug Mode
For detailed debugging, open browser developer tools (F12) and check:
- **Console tab**: For JavaScript errors and API responses  
- **Network tab**: For API call details and response status
- **Elements tab**: For DOM structure and CSS issues

## 📝 Notes

- The application requires the backend API to be running for full functionality
- All todo data is persisted in the backend database
- The application uses Angular's standalone components (Angular 14+ feature)
- Modern CSS features like CSS Grid and Flexbox are used for responsive design

---

**Happy Task Managing!** 🎉

For questions or support, please refer to the troubleshooting section above or check the browser console for detailed error messages.
