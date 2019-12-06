import { Module, ModuleTC } from '../models/module';

const ModuleQuery = {
    moduleById: ModuleTC.getResolver('findById'),
    moduleByIds: ModuleTC.getResolver('findByIds'),
    moduleOne: ModuleTC.getResolver('findOne'),
    moduleMany: ModuleTC.getResolver('findMany'),
    moduleCount: ModuleTC.getResolver('count'),
    moduleConnection: ModuleTC.getResolver('connection'),
    modulePagination: ModuleTC.getResolver('pagination'),
};

const ModuleMutation = {
    moduleCreateOne: ModuleTC.getResolver('createOne'),
    moduleCreateMany: ModuleTC.getResolver('createMany'),
    moduleUpdateById: ModuleTC.getResolver('updateById'),
    moduleUpdateOne: ModuleTC.getResolver('updateOne'),
    moduleUpdateMany: ModuleTC.getResolver('updateMany'),
    moduleRemoveById: ModuleTC.getResolver('removeById'),
    moduleRemoveOne: ModuleTC.getResolver('removeOne'),
    moduleRemoveMany: ModuleTC.getResolver('removeMany'),
};

export { ModuleQuery, ModuleMutation };