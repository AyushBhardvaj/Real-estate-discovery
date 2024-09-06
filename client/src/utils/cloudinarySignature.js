export const getCloudinarySignature = async (public_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/upload-signature`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          public_id,
        }),
      }
    );
    const data = await response.json();
    return data;
  };
  
  export const getCloudinaryDeleteSignature = async (public_id) => {
    console.log(public_id);
  
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/delete-signature`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          public_id,
        }),
      }
    );
    const data = await response.json();
    return data;
  };
  