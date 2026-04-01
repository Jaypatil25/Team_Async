

const MONGODB_COLLECTIONS = {
  companies: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["company_id", "name"],
        properties: {
          _id: { bsonType: "objectId" },
          company_id: { bsonType: "string" },
          name: { bsonType: "string" },
          pan: { bsonType: "string" },
          cin: { bsonType: "string" },
          gstin: { bsonType: "string" },
          businessType: { bsonType: "string" },
          businessActivity: { bsonType: "string" },
          registrationDate: { bsonType: "date" },
          lastFilingDate: { bsonType: "date" },
          directors: {
            bsonType: "array",
            items: {
              bsonType: "object",
              properties: {
                id: { bsonType: "string" },
                name: { bsonType: "string" },
                role: { bsonType: "string" },
                pan: { bsonType: "string" }
              }
            }
          },
          annualTurnover: { bsonType: "double" },
          employeeCount: { bsonType: "int" },
          shellCompanyProbability: { bsonType: "double" },
          riskLevel: { bsonType: "string" },
          createdAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" }
        }
      }
    }
  },

  ownership_relationships: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["fromCompanyId", "toCompanyId"],
        properties: {
          _id: { bsonType: "objectId" },
          fromCompanyId: { bsonType: "string" },
          toCompanyId: { bsonType: "string" },
          relationshipType: { bsonType: "string" },
          stakePercentage: { bsonType: "double" },
          startDate: { bsonType: "date" },
          endDate: { bsonType: "date" },
          active: { bsonType: "bool" },
          createdAt: { bsonType: "date" }
        }
      }
    }
  },

  financial_contradictions: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["companyId", "type"],
        properties: {
          _id: { bsonType: "objectId" },
          companyId: { bsonType: "string" },
          documentId: { bsonType: "string" },
          type: { bsonType: "string" },
          severity: { bsonType: "string" },
          message: { bsonType: "string" },
          deviationPercentage: { bsonType: "double" },
          value1: { bsonType: "double" },
          value2: { bsonType: "double" },
          isResolved: { bsonType: "bool" },
          createdAt: { bsonType: "date" }
        }
      }
    }
  },

  shell_company_analysis: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["companyId"],
        properties: {
          _id: { bsonType: "objectId" },
          companyId: { bsonType: "string" },
          indicators: { bsonType: "object" },
          shellCompanyProbability: { bsonType: "double" },
          riskLevel: { bsonType: "string" },
          analysisJson: { bsonType: "object" },
          createdAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" }
        }
      }
    }
  }
};

export { SQL_MIGRATIONS, MONGODB_COLLECTIONS };
