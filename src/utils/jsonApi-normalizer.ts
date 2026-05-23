import type {
  IDataWithSelfLink,
  IListResponse,
  IRelationshipData,
  IResponseData,
  ISingleResponse,
} from '@/interfaces/api/IApiBaseResponse';

const indexIncludedResources = <TIncluded>(
  included: IDataWithSelfLink<TIncluded>[] = [],
): Record<string, IDataWithSelfLink<TIncluded>> => {
  return included.reduce<Record<string, IDataWithSelfLink<TIncluded>>>(
    (map, item) => {
      map[`${item.type}:${item.id}`] = item;
      return map;
    },
    {},
  );
};

const resolveRelation = <TIncluded>(
  relationData: IRelationshipData,
  includedMap: Record<string, IDataWithSelfLink<TIncluded>>,
): unknown => {
  if (Array.isArray(relationData)) {
    return relationData.map((relItem) => {
      const found = includedMap[`${relItem.type}:${relItem.id}`];
      return found ? normalizeItem(found, includedMap) : relItem;
    });
  }

  if (relationData) {
    const found = includedMap[`${relationData.type}:${relationData.id}`];
    return found ? normalizeItem(found, includedMap) : relationData;
  }
};

const hydrateRelationships = <TAttributes, TIncluded = unknown>(
  item: IResponseData<TAttributes>,
  includedMap: Record<string, IDataWithSelfLink<TIncluded>>,
): Record<string, unknown> => {
  const { relationships } = item;

  if (!relationships) return {};

  return Object.keys(relationships).reduce(
    (acc, relation) => {
      const relData = relationships[relation].data;
      acc[relation] = resolveRelation(relData, includedMap);
      return acc;
    },
    {} as Record<string, unknown>,
  );
};

const normalizeItem = <TAttributes, TEntity>(
  item: IResponseData<TAttributes>,
  includedMap: Record<string, IDataWithSelfLink<TAttributes>>,
): TEntity =>
  ({
    ...(item.id && { id: item.id }),
    ...item.attributes,
    ...hydrateRelationships(item, includedMap),
  }) as TEntity;

export const normalizeJsonApiList = <TAttributes, TEntity>(
  response: IListResponse<TAttributes>,
): TEntity[] => {
  const includedMap = indexIncludedResources(response.included);
  return response.data.map((item) => normalizeItem(item, includedMap));
};

export const normalizeJsonApiItem = <TAttributes, TEntity>(
  response: ISingleResponse<TAttributes>,
): TEntity => {
  const includedMap = indexIncludedResources(response.included);
  return normalizeItem(response.data, includedMap);
};
