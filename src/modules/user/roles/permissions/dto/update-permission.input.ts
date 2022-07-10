export class UpdatePermissionInput {
  id?: number;

  resourceName!: string;
  creatorOnly!: boolean;

  canCreate?: boolean;
  canRead?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;

  roleId!: number;
}
