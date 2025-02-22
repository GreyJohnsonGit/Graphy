import { Option } from 'fp-ts/lib/Option';
import { ChangeEvent } from 'react';
import { Some } from '../models/FunctionalExt';

export interface NodeSelectProps {
  nodeIds: string[];
  selectNode: (nodeId: Option<string>) => void;
}

export function NodeSelect({ nodeIds, selectNode }: NodeSelectProps) {

  return (
    <>
      <p>Select a node</p>
      <select onChange={onChange}>
        {nodeIds.map((nodeId) =>
          <option
            key={nodeId}
            value={nodeId}
          >
            Node {nodeId}
          </option>
        )}
      </select>
    </>
  );

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;
    selectNode(Some(selectedValue));
  }
}