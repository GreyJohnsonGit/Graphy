import { CSSProperties } from 'react';
import { MemberWrap } from '../models/Member';
import { MethodWrap } from '../models/Method';
import { HydratedNode } from '../models/Node';

export interface NodeProps {
  hydratedNode: HydratedNode;
  onSelect: (nodeId: string) => void;
}

export function Node({ hydratedNode, onSelect }: NodeProps) {
  const styles = style(hydratedNode);
  const { node } = hydratedNode;
  
  return <div style={styles.outerDiv} onClick={() => onSelect(node.id)}>
    <table>
      <tbody>
        <tr>
          <th>{node.type} {node.name}</th>
        </tr>
        {hydratedNode.members.map(member => <tr><td>{MemberWrap.of(member).toMemberSignature()}</td></tr>)}
        {hydratedNode.methods.map(method => <tr><td>{MethodWrap.of(method).toMethodSignature()}</td></tr>)}
      </tbody>
    </table>
  </div>;
}

function style(node: HydratedNode) {
  return {
    outerDiv: {
      backgroundColor: node.node.color,
    }
  } satisfies Record<string, CSSProperties>;
}