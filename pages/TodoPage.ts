import { Page, Locator } from "@playwright/test";

export class TodoPage {
    readonly page: Page;
    readonly todo: Locator;
    readonly todoList: Locator;
    readonly clearTodoButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.todo = page.locator("input[id='item-input']");
        this.clearTodoButton = this.clearTodoButton = page.locator("#clear-btn");
        this.todoList = this.page.locator("div[class='items']");
    }

    async createTodo(todo: string): Promise<void> {
        await this.todo.fill(todo);
        await this.todo.press('Enter');
    }

    async completeTodo(todo: string): Promise<void> {
        await this.getTodo(todo).locator("span[class='item-body']").click();
    }
    
    async getTodoText(todo: string): Promise<string> {
        return await this.getTodo(todo).innerText();
    }

    async getCompletedTodoCheckbox(todo: string): Promise<Locator> {
        return await this.getTodo(todo).locator("span[class='inactive-item']")
    }

    async clearTodos(): Promise<void> {
        await this.clearTodoButton.click();
    }

    getTodo(todo: string): Locator {
        return this.todoList.locator(`div[data-body='${todo}']`);
    }
}