import { Member } from './Member';
import { Method } from './Method';

export interface Node {
  id: string;
  name: string;
  color: string;
  type: 'interface' | 'class';
}

export interface Relationship {
  label: string;
  sourceId: string;
  targetId: string;
}

export type Neighbor = HydratedNode & { 
  relationship: Relationship 
};

export interface HydratedNode {
  node: Node;
  methods: Method[];
  members: Member[];
}