Create a function called `createXYZ()` in `actions.js`, where `XYZ` represents
the entity for which you are creating the page. This function is responsible for
creating a single instance. For the sake of this documentation, let's assume
that you are creating a transaction. Therefore, the function will be named `createTransaction()`.
At this point, you should know the attributes in the transaction object.
So use `Faker.js` to fill the object with random data.

Next create a constant called `DEFAULT_XYZ`. In our example, this would be `DEFAULT_TRANSACTIONS`
that tells how many fake entries will be generated. Use a for loop and create that many objects
by repeatedly invoking the function you just created. Since transaction depends on another object,
you need to ensure that your for loop comes after the for loop that creates subscriptions.
You can now modify your `createTransaction()` function to select a random subscription like this:

```
const transaction = {
   ...
   subscription: faker.random.arrayElement(subscription),
   ...
}
```

Now that you have created the fake data, you can start working on the mock backend.

There are generally five methods you need to implement:

-   GET all the transactions
-   GET a specific transaction
-   POST a transaction
-   PUT a transaction
-   DELETE a transaction

Here, the first two and the last are obvious. The POST and PUT methods are used to create and edit,
respectively. The implementation for getting all the transactions is pretty straight forward.
You simply return all the items from the fake database table, which is an array in the mock backend.
As for the other methods, you need to get the identifier for the transaction you want work with from
the resource URL. This is where the regex pattern comes in. You can copy the regex from existing
methods. You need to modify the regex as needed. For the transaction entity, you just need to add
"transactions" to the URL by removing the old entity type. It is a good idea to create a constant
to represent the regex because it will be reused inside the method when extracting the value.

The general URL form is:

```
/api/v1/entity/identifier
```

Axios Mock Adapter does not provide an out of the box solution to retrieve the identifier. So you
use regex captures to extract the identifier. The regex in the other methods are designed to capture
the identifier. Basically, a parenthesis represents a capture. When you run `exec`, it gives you an
array of all the captures. The first element is always the string you pass to `exec`. The second
element will be the identifier. So you need to use index `1` to retrieve the identifier.
After you retrieve the identifier, everything else is pretty much the same as other methods.
