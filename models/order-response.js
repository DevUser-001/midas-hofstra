const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const orderResSchema = new Schema({
    resource: { type: String},
    id: { type: String},
    profileId: { type: String},
    amount: { value: { type: String}, currency: { type: String} },
    status: { type: String},
    isCancelable: { type: Boolean },
    metadata: { order_id: { type: String}, description: { type: String} },
    createdAt: { type: String},
    expiresAt: { type: String},
    mode: { type: String},
    locale: { type: String},
    billingAddress: {
      organizationName: { type: String},
      streetAndNumber: { type: String},
      postalCode: { type: String},
      city: { type: String},
      region: { type: String},
      country: { type: String},
      title: { type: String},
      givenName: { type: String},
      familyName: { type: String},
      email: { type: String},
      phone: { type: String}
    },
    shopperCountryMustMatchBillingCountry: { type: Boolean },
    consumerDateOfBirth: { type: String},
    orderNumber: { type: String},
    shippingAddress: {
      organizationName: { type: String},
      streetAndNumber: { type: String},
      streetAdditional: { type: String},
      postalCode: { type: String},
      city: { type: String},
      region: { type: String},
      country: { type: String},
      title: { type: String},
      givenName: { type: String},
      familyName: { type: String},
      email: { type: String},
      phone: { type: String}
    },
    redirectUrl: { type: String},
    webhookUrl: { type: String},
    lines: { type: Array},
    _links: {
      self: {
        href: { type: String},
        type: { type: String}
      },
      dashboard: {
        href: { type: String},
        type: { type: String}
      },
      checkout: {
        href: { type: String},
        type: { type: String}
      },
      documentation: {
        href: { type: String},
        type: { type: String}
      }
    }
  })

const OrderRes = mongoose.model('OrderRes', orderResSchema, 'order-response');

module.exports = OrderRes;
