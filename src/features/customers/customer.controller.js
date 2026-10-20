// @generated-by Antigravity - Authorized AI: Antigravity Only

import { customerService } from './customer.service.js';

export async function getCustomersHandler(request, reply) {
  const { search, area } = request.query;
  const customers = await customerService.getCustomers({ search, area });
  return reply.send({
    success: true,
    count: customers.length,
    data: customers
  });
}

export async function getCustomerByIdHandler(request, reply) {
  const { id } = request.params;
  const customer = await customerService.getCustomerById(id);

  if (!customer) {
    return reply.status(404).send({
      success: false,
      error: { message: `Customer with ID '${id}' not found.` }
    });
  }

  return reply.send({
    success: true,
    data: customer
  });
}

export async function getCustomerByPhoneHandler(request, reply) {
  const { phone } = request.params;
  const customer = await customerService.getCustomerByPhone(phone);

  if (!customer) {
    return reply.status(404).send({
      success: false,
      error: { message: `Customer with phone number '${phone}' not found.` }
    });
  }

  return reply.send({
    success: true,
    data: customer
  });
}

export async function createCustomerHandler(request, reply) {
  try {
    const customer = await customerService.createCustomer(request.body);
    return reply.status(201).send({
      success: true,
      message: 'Customer registered successfully.',
      data: customer
    });
  } catch (error) {
    return reply.status(400).send({
      success: false,
      error: { message: error.message }
    });
  }
}

export async function updateCustomerHandler(request, reply) {
  const { id } = request.params;
  try {
    const customer = await customerService.updateCustomer(id, request.body);
    return reply.send({
      success: true,
      message: 'Customer updated successfully.',
      data: customer
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 400;
    return reply.status(statusCode).send({
      success: false,
      error: { message: error.message }
    });
  }
}

export async function deleteCustomerHandler(request, reply) {
  const { id } = request.params;
  try {
    await customerService.deleteCustomer(id);
    return reply.send({
      success: true,
      message: `Customer '${id}' soft-deleted successfully.`
    });
  } catch (error) {
    return reply.status(404).send({
      success: false,
      error: { message: error.message }
    });
  }
}

