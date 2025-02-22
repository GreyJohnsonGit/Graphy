import { CSSProperties } from 'react';
import { MemberWrap } from '../models/Member';
import { MethodWrap } from '../models/Method';
import { Neighbor as DataNeighbor } from '../models/Node';

export interface NodeProps {
  neighbor: DataNeighbor;
  onSelect: (nodeId: string) => void;
}

export function Neighbor({ neighbor, onSelect }: NodeProps) {
  const styles = style(neighbor);
  
  return <div style={styles.outerDiv} onClick={() => onSelect(neighbor.node.id)}>
    <p>{neighbor.relationship.label}</p>
    <table>
      <tbody>
        <tr>
          <th>{neighbor.node.type} {neighbor.node.name}</th>
        </tr>
        {neighbor.members.map(member => <tr><td>{MemberWrap.of(member).toMemberSignature()}</td></tr>)}
        {neighbor.methods.map(method => <tr><td>{MethodWrap.of(method).toMethodSignature()}</td></tr>)}
      </tbody>
    </table>
  </div>;
}

function style(neighbor: DataNeighbor) {
  return {
    outerDiv: {
      backgroundColor: neighbor.node.color,
      margin: '1em',
    }
  } satisfies Record<string, CSSProperties>;
}