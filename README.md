Fun app to display UML Class diagram data.

![image](https://github.com/user-attachments/assets/5f9cb14f-c00a-4ccd-81a2-279a811d1638)

Example Data!

```ts
const nodes: DataNode[] = [
    { id: '1', name: 'LdapCredentials', color: '#808090', type: 'class' },
    { id: '2', name: 'ISerializable', color: 'green', type: 'interface' },
    { id: '3', name: 'ISimpleCredentials', color: 'orange', type: 'interface' },
    { id: '4', name: 'ILogger', color: 'blue', type: 'interface' },
    { id: '5', name: 'ITransactionLogger', color: 'yellow', type: 'interface' },
    { id: '6', name: 'AppLogger', color: 'purple', type: 'class' },
    { id: '7', name: 'ActiveDirectoryCredentials', color: 'pink', type: 'class' },
  ];

  const relationships: Relationship[] = [
    { label: 'Implements', sourceId: '2', targetId: '1' },
    { label: 'Implements', sourceId: '3', targetId: '1' },
    { label: 'Extends', sourceId: '4', targetId: '5' },
    { label: 'Implements', sourceId: '5', targetId: '6' },
    { label: 'Composes', sourceId: '5', targetId: '1' },
    { label: 'Extends', sourceId: '1', targetId: '7' }
  ];

  const methods: Method[] = [
    { nodeId: '1', visibility: 'public', static: true, name: 'LdapCredentials', returnType: 'LdapCredentials', parameters: ['username', 'password'] },
    { nodeId: '3', visibility: 'public', static: false, name: 'Username', returnType: 'String', parameters: [] },
    { nodeId: '3', visibility: 'public', static: false, name: 'Password', returnType: 'String', parameters: [] },
    { nodeId: '2', visibility: 'public', static: false, name: 'serialize', returnType: 'String', parameters: [] },
    { nodeId: '4', visibility: 'public', static: false, name: 'log', returnType: 'void', parameters: ['String'] },
    { nodeId: '7', visibility: 'public', static: false, name: 'SamAccountName', returnType: 'String', parameters: [] },
    { nodeId: '6', visibility: 'public', static: true, name: 'AppLogger', returnType: 'AppLogger', parameters: [] },
  ];

  const members: Member[] = [
    { nodeId: '1', static: false, visibility: 'private', name: '_logger', type: 'ITransactionLogger' },
    { nodeId: '1', static: false, visibility: 'private', name: '_username', type: 'String' },
    { nodeId: '1', static: false, visibility: 'private', name: '_password', type: 'String' },
    { nodeId: '7', static: false, visibility: 'private', name: '_samAccountName', type: 'String' },
  ];
```
