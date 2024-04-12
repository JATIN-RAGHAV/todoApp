let sendbutton = document.getElementById("sendButton");
let GetButton = document.getElementById("GetButton");
let list = document.getElementById("list");
GetButton.addEventListener("click", (event) => {
  fetch("http://localhost:3000/todos", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      list.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent =
          "Title: " +
          data[i]["title"] +
          ",  Description: " +
          data[i]["description"];
        list.appendChild(listItem);
      }
    });
});

function printData(event) {}

sendbutton.addEventListener("click", function (event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();
  console.log("inside sendTodo function");

  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  // Create a body object with title and description
  let body = {
    title: title,
    description: description,
  };

  // Use JSON.stringify to convert body to a JSON string
  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        // Handle successful response
        console.log("Todo sent successfully!");
        return response.json();
      } else {
        throw new Error("Request failed: " + response.statusText);
      }
    })
    .then((data) => {
      // Do something with the response data
      console.log("Response data:", data);
      const listItem = document.createElement("li");
      listItem.textContent =
        "Title: " + body["title"] + ",  Description: " + body["description"];
      list.appendChild(listItem);
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
});
