# How to Update Your Project Gallery Images

When you are ready to replace the stock/AI-generated placeholder photos with **real photos** of your actual gutter guard installations, follow these simple steps!

## Step 1: Prepare Your New Photos
Take 4 great photos of your work.
* They should be **landscape** orientation (wider than they are tall).
* For the best loading speed, try to keep them under **1MB** each.
* Rename your 4 new photo files to exactly match the current names:
  1. `gallery_1.png`
  2. `gallery_2.png`
  3. `gallery_3.png`
  4. `gallery_4.png`

*(Note: If your photos are `.jpg` instead of `.png`, you will need to open `gallery.html` in an editor and change the `.png` extension in the code to `.jpg`.)*

## Step 2: Upload and Replace
The easiest way to swap them is directly through GitHub:
1. Go to your GitHub repository for `Atlanta-Gutter-Guard-Pros`.
2. Navigate into the `images` folder, and then the `gallery` folder.
3. Click on `gallery_1.png`.
4. In the top right corner of the image view, click the **three dots (...)** and select **Delete file**. Confirm the deletion.
5. Once deleted, click the **Add file** button at the top right of the `gallery` folder, and select **Upload files**.
6. Drag and drop your real `gallery_1.png` photo into the box.
7. Click the green **Commit changes** button.

Repeat this for all 4 images!

## Step 3: Wait 60 Seconds
Once you commit the new images to GitHub, Cloudflare will automatically rebuild your website. 
Wait about 60 seconds, go to your live website, and do a **Hard Refresh** (Hold `Ctrl` and press `F5` on Windows, or `Cmd` + `Shift` + `R` on Mac) to clear your browser cache and see your new photos!

## Want to change the text beneath the photos?
If you want to change the titles or paragraphs underneath your new photos:
1. Open the `gallery.html` file in GitHub.
2. Click the Pencil icon to edit.
3. Scroll down to line 95-121 where you see `<div class="gallery-item-content">`.
4. Edit the text inside the `<h3>` and `<p>` tags.
5. Click **Commit changes**.
