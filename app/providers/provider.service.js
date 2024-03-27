"use strict";
const db = require("../../models");
const Providers = db.Providers;
/**
 * 
 * @param {number, number, boolean| null, boolean | null} queryParams 
 * @returns 
 */
exports.getProviders = async ({page = 1, limit = 10, active= null, isDefault=null}) => {
  const offset = (page - 1) * limit;
  let where = {};
  if(active !== null) {
    where.active = active;
  }
  if(isDefault !== null) where.isDefault = isDefault;
  const providers = await Providers.findAll({
    where,
    offset,
    limit: limit,
  });
  return { data: providers, code: 200 };
};
/**
 * 
 * @param {uuid} providerId 
 * @returns 
 */
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

/**
 * 
 * @param {string, string, string, string, boolean} Provider 
 * @returns 
 */
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
/**
 * 
 * @param {uuid} id 
 * @param {boolean} toggle 
 * @returns 
 */
exports.toggleActive = async (id, toggle) => {
  try {
    const provider = await Providers.findByPk(id);
    // console.log("Provider found", {provider})
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

/**
 * 
 * @param {uuid} providerId 
 * @returns 
 */
exports.setDefault = async (providerId) => {
      await Providers.update({isDefault: false},{returning: true, where: {isDefault: true}}).then(([row, [updated]]) => updated);

    const newDefault = await Providers.update({isDefault: true},{where: {id: providerId}, returning: true}).then(([row, [updated]]) => updated)
    return {data: newDefault};
}