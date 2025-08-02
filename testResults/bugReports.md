First, we would like you to spend some time in the UI. Do some exploratory testing. We have left some bugs for you to find. Make sure you go through the system to find these bugs. After you are satisfied document your findings including the following:

- Name of the bug
- What is happening?
- How do you reproduce it?
- Your thoughts on how severe it is. There is no scale here just looking for how you articulate.


# Bug Reports
| Bug Number | Name of Bug | Expected Results | Actual Results | Steps to Reproduce | Severity<sup>1</sup> | Notes |  
| --- | --- | --- | --- | --- | --- | --- |
| 1. | Typos in Points Redeemed and Points Remaining fields | Ponts should contain an 'i' in both cases, e.g. 'Points Redeemed' and 'Points Remaining' | 'i' is missing from both field labels | Open the application  and view the home page | 2 | 
| 2. | 'a' should be 'an' in Scroll of Infinite WiFi | When unfurled, creates *an* area of super-fast secure WiFi for you and your companions. | When unfurled, creates *a* area of super-fast secure WiFi for you and your companions. | Open the application and view the home page. | 4 | |
| 3. | "T-Shirt +2" needs a better description | TBD | Official DjangoCon 2023 T-shirt, +2 to Armor Class. | Open the application and view the home page. | 4 | I'm not sure what that description means |
| 4. | The 'About' page is missing | A description should be displayed when 'About' in the menu bar is clicked | 404 | 1. Open the application   2. Click 'About' in the menu bar | 2 | |
| 5. | Sign In link is broken | Sign in screen is displayed when the link is clicked | "Error occurred while trying to proxy: localhost:3000/accounts/signup/" | This occurs in two places:   1. Home screen menu 2. Link on sign in screen  | 1 | This makes the application unusable |
| 6. | 'Sign In' button should be on a separate line on the 'Sign In' screen | 'Sign In' button should be on a separate line on the 'Sign In' screen | Sign In button is next to 'Forgot Password' link | 1. Log into application 2. Click on 'Sign In' | 4 | |



#### Notes
1. Severity is a value from 1 to 5, 1 being the most severe.

accommodate 

# TO DO
1. Improve steps to recreate no bug #5
2. Add carriage returns to make steps readable
3. Automated Tests:
    1. Verify 'holistiplan' link on all pages
    2. Verify 'Home' link on all pages
4. bug?  |  7. | T-Shirt +2 description box is smaller than the others if the browser is expanded; note that sizes also vary if the browser is small | T-Shirt +2 description box should be the same size as the others | T-Shirt +2 description box is |
