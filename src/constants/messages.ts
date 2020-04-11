interface GeneralParamsInterface {
  resource: string;
  action: string;
}

const general = ({ resource, action }: GeneralParamsInterface): string => {
  return `${resource} has been ${action} successfully`;
};

export const deleted = (resource: string): string => general({ resource, action: 'deleted' });
export const created = (resource: string): string => general({ resource, action: 'created' });
export const updated = (resource: string): string => general({ resource, action: 'updated' });

export const notExists = (resource: string): string => `${resource} doesn't exist`;

export const unauthorizedAccess = (): string => 'Unauthorized access';
export const forbiddenAccess = (): string => 'Forbidden access';
