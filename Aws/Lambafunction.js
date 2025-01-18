exports.handler = async (event) => {
  try {
    const { num1, num2 } = event;

    if (typeof num1 !== "number" || typeof num2 !== "number") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Both inputs must be numbers.",
        }),
      };
    }

    const result = num1 + num2;

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: result,
        message: "The sum of ${num1} and ${num2} is ${result}",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An unexpected error occurred.",
        details: error.message,
      }),
    };
  }
};
