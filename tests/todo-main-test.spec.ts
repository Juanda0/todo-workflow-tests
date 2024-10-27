import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { TodoPage } from '../pages/TodoPage';
import { basic_todo } from '../data/todo.json'

test.describe('Todoism Test Suite', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.login();

    const loginPage = new LoginPage(page);
    await loginPage.loginWithTestAccount();

    todoPage = new TodoPage(page);
  });

  test('Add a new todo', async ({ page }) => {
    await todoPage.createTodo(basic_todo);
    expect(await todoPage.getTodoText(basic_todo)).toContain(basic_todo);
  });

  test('Complete a todo in todos list', async ({ page }) => {
    await todoPage.createTodo(basic_todo);
    await todoPage.completeTodo(basic_todo);
    expect(await todoPage.getCompletedTodoCheckbox(basic_todo)).toBeVisible();
  });

  test('Clear all todos', async ({ page }) => {
    await todoPage.createTodo(basic_todo);
    await todoPage.completeTodo(basic_todo);
    await todoPage.clearTodos();
    expect(await todoPage.getTodo(basic_todo)).toBeHidden();
  });

});