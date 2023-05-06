import { MenuItem } from './entities/menu-item.entity';
import { Repository, In } from "typeorm";
import App from "../../app";

export class MenuItemsService {

  private menuItemRepository: Repository<MenuItem>;

  constructor(app: App) {
    this.menuItemRepository = app.getDataSource().getRepository(MenuItem);
  }

  async getMenuItems(): Promise<MenuItem[]> {
    const menuItems = await this.menuItemRepository.find();
    const menuItemsMap = new Map<number, MenuItem>();
    const rootItems: MenuItem[] = [];

    // create a map of all menu items for easy lookup by id
    for (const item of menuItems) {
      menuItemsMap.set(item.id, item);
    }

    // add each item to its parent's children array, or to the rootItems array if it has no parent
    for (const item of menuItems) {
      const parentId = item.parentId;
      if (parentId === null) {
        rootItems.push(item);
      } else {
        const parent = menuItemsMap.get(parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(item);
        }
      }
    }

    return rootItems;
  }
}
