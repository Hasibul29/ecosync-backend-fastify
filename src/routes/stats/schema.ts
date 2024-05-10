const statsSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            totalVehicle: { type: "number" },
            totalSts: { type: "number" },
            totalLandfill: { type: "number" },
            totalUser: { type: "number" },
            totalGurbadgeCollected: { type: "number" },
            totalGurbadgeDisposed: { type: "number" },
            landfill: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  capacity: { type: "number" },
                  latitude: { type: "number" },
                  longitude: { type: "number" },
                },
              },
            },
            sts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  capacity: { type: "number" },
                  latitude: { type: "number" },
                  longitude: { type: "number" },
                },
              },
            },
          },
        },
      },
    },
    500: {

      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export { statsSchema };
