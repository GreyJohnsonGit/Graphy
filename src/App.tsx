import { pipe } from 'fp-ts/lib/function';
import { getOrElse, map } from 'fp-ts/lib/Option';
import { CSSProperties, useState } from 'react';
import './App.css';
import { Neighbor } from './components/Neighbor';
import { Node } from './components/Node';
import { NodeSelect } from './components/NodeSelect';
import { findAll, findFirst, innerJoin, None, Option, Some } from './models/FunctionalExt';
import { Member } from './models/Member';
import { Method } from './models/Method';
import { Neighbor as DataNeighbor, Node as DataNode, HydratedNode, Relationship } from './models/Node';

export function App() {
  // State
  const [nodeId, setNodeId] = useState<Option<string>>(None());

  // Setup
  const styles = style();

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

  const nodeIds = nodes.map((node) => node.id);
  const activeNode = pipe(
    nodeId,
    findFirst(nodes)((nodeId, node) => nodeId === node.id)
  );
    
  const lowerNeighbors = pipe(
    activeNode,
    findAll<DataNode, Relationship>(relationships)(
      (node, relationship) => relationship.sourceId === node.id
    ),
    innerJoin<DataNode, Relationship>(nodes)(
      (node, relationship) => relationship.targetId == node.id
    ),
    map(neighbors => neighbors.map(neighbor => ({
      node: neighbor,
      relationship: neighbor,
      methods: methods.filter(method => method.nodeId === neighbor.id),
      members: members.filter(member => member.nodeId === neighbor.id),
    }))),
    getOrElse(() => [] as DataNeighbor[]),
  );

  const upperNeighbors = pipe(
    activeNode,
    findAll<DataNode, Relationship>(relationships)(
      (node, relationship) => relationship.targetId === node.id
    ),
    innerJoin<DataNode, Relationship>(nodes)(
      (node, relationship) => relationship.sourceId == node.id
    ),
    map(neighbors => neighbors.map(neighbor => ({
      node: neighbor,
      relationship: neighbor,
      methods: methods.filter(method => method.nodeId === neighbor.id),
      members: members.filter(member => member.nodeId === neighbor.id),
    }))),
    getOrElse(() => [] as DataNeighbor[]),
  );

  const hydratedNode: Option<HydratedNode> = pipe(
    nodeId,
    findFirst<string, DataNode>(nodes)((nodeId, node) => nodeId === node.id),
    map(node => ({
      node, 
      methods: methods.filter(method => method.nodeId === node.id),
      members: members.filter(member => member.nodeId === node.id),
    })),
  );

  // Serve
  return (
    <>
      <div style={styles.sidebar}>
        <b>Interface</b>
        {nodes.filter(node => node.type === 'interface').map(node => <p onClick={() => setNodeId(Some(node.id))} style={styles.smallMargins}>{node.name}</p>)}
        <b>Class</b>
        {nodes.filter(node => node.type === 'class').map(node => <p onClick={() => setNodeId(Some(node.id))} style={styles.smallMargins}>{node.name}</p>)}
      </div>

      <div style={styles.centeredColumn}>
        <div style={styles.horizontalLayout}>
          {upperNeighbors.map(neighbor => 
            <div key={neighbor.node.id}>
              <Neighbor 
                neighbor={neighbor} 
                onSelect={nodeId => setNodeId(Some(nodeId))} 
              />
            </div>
          )}
        </div>
        <h2>⬆ Upper Neighbors ⬆</h2>
        {hydratedNode._tag === 'Some' && (
          <Node hydratedNode={hydratedNode.value} onSelect={() => null}/>
        )}
        <NodeSelect nodeIds={nodeIds} selectNode={setNodeId} />
        <h2>⬇ Lower Neighbors ⬇</h2>
        <div style={styles.horizontalLayout}>
          {lowerNeighbors.map(neighbor => 
            <div key={neighbor.node.id}>
              <Neighbor 
                neighbor={neighbor} 
                onSelect={nodeId => setNodeId(Some(nodeId))} 
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function style() {
  return {
    centeredColumn: { 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      marginLeft: '15em'
    },
    horizontalLayout: { 
      display: 'flex', 
      flexDirection: 'row'
    },
    sidebar: {
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: '15em',
      backgroundColor: 'gray',
      textAlign: 'left',
      overflowY: 'scroll',
      overflowX: 'hidden',
      paddingLeft: '.5em',
      scrollbarWidth: 'none'
    },
    smallMargins: {
      margin: '0.5em'
    }
  } satisfies Record<string, CSSProperties>;
}