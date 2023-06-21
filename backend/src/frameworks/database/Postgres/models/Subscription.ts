import { Sequelize, DataTypes, Model } from "sequelize";
import { initSubscriptionPlans } from "./admins";
const { v4: uuidv4 } = require("uuid");
export const initSubscriptionModal = (sequelize: Sequelize) => {
  return sequelize.define("subscriptions", {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "companies",
        key: "id",
      },
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "plans",
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.STRING(20),
      defaultValue: "pending",
    },
    orderId: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    PaymentMode: {
      type: DataTypes.STRING(20),
      defaultValue: "Paypal",
    },
    numberOfInterviews: {
      type: DataTypes.STRING(20),
      allowNull: false,
      
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
export const initPaymentmodal = (sequelize: Sequelize) => {
  return sequelize.define("payments", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4,
    },
    subscriptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "subscriptions",
        key: "id",
      },
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false,

      references: {
        model: "companies",
        key: "id",
      },
    },
  });
};
