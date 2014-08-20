
# Olark Integration

- [site](https://www.olark.com)
- [docs](https://www.olark.com/customer/portal/articles/1206016)

## How to contact them

## How the platform works

- A chat box appears on the bottom right of the screen. You can customize the way it looks.

![https://i.cloudup.com/e5eedDx2II-2000x2000.png](https://i.cloudup.com/e5eedDx2II-2000x2000.png)

- Typically an organization that wants to use Olark across multiple sites will just create "Groups", so they need to specify their "group id" to map the chat to a specific site. A more intuitive way would have been to just create different accounts or projects for each site, but this is how you do it here.

## How their API works

- They use a JavaScript snippet.

## How we implemented their API

- If they have a `groupId`, we set it.