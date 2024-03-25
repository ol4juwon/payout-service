"use strict";
const db = require("../../models");
const Providers = db.Providers;
exports.getProviders = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const providers = await Providers.findAll({
    offset,
    limit: limit,
  });
  return { data: providers, code: 200 };
};
exports.getSingleProvider = async (providerId) => {
  try {
    const provider = await Providers.findByPk(providerId);
    if (provider != null) {
      return { data: provider, code: 200 };
    }
    return { error: "provider not found", code: 404 };
  } catch (err) {
    return { error: err.message, code: 500 };
  }
};

exports.addProvider = async ({ name, slug, description, value,active }) => {
  try {
    const provider = await Providers.create({
      name,
      slug,
      description,
      value,
      active: active? active: true, 
    });
    return { data: provider, code: 201 };
  } catch (err) {
    console.log({err: err.errors[0].message},)
    return { error: err.errors[0].message || err.message, code: 500 };
  }
};

exports.toggleActive = async (id, toggle) => {
  try {
    const provider = await Providers.findByPk(id);
    console.log("Provider found", {provider})
    if(provider == null)
        return {error: `provider with ${id} not found`, code: 404};

    if(provider.active == toggle){
        return {error: `provider with ${id} already ${toggle ? 'activated':'deactivated'}`, code: 422};
    }
    const defaultProvider = await Providers.update(
      { active: toggle },
      { returning: true, where: { id: id, active: !toggle } }
    ).then(([rows, [updatedProvider]]) => updatedProvider);
    if (defaultProvider) {
      return { data: defaultProvider, code: 200 };
    }
    return { error: "Something went wrong", code: 400 };
  } catch (err) {
    return { error: err.message, code: 500 };
  }
};

exports.activeProviders = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const providers = await Providers.findAll({
    where: {
      active: true,
    },
    offset,
    limit: limit,
  });
  return { data: providers, code: 200 };
};

exports.setDefault = async (providerId) => {
     await Providers.update({isDefault: false},{returning: true, where: {isDefault: true}}).then(([row, [updated]]) => updated);
    const newDefault = await Providers.update({isDefault: true},{where: {id: providerId}, returning: true}).then(([row, [updated]]) => updated)
    return {data: newDefault};
}