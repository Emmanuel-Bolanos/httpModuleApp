# HTTP Module Assignment

Instructions:

- [ ] Create a server that is going to be listening requests on port 9000

- [ ] Your Node App should be able to store a number in the path /myNumber. Use body payload to send the value: { myNumber: 123 }. Don't create one number per request, just create or update the current number.

- [ ] You can see the value number with a request to /myNumber

- [ ] If you receive a request from path /myNumber/{multiplier}, you should return in the response the value: myNumber*multiplier. If there is no current value for myNumber, return 400 error.

- [ ] Delete the current value with a request to /reset.

- [ ] If you try to use a non-numeric value to create/update myNumber, a 400 error should be returned.

- [ ] If there is no value stored, a 404 should be returned.

- [ ] Any other request should be handled with an error code 404, "resource not found".