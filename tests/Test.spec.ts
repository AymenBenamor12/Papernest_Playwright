import { test, expect } from '@playwright/test';

test.describe('Papernest Onboarding Test', () => {
  const ancienlogement = "113 Rue Lecourbe 75015 Paris";
  const nouveaulogement = "157 Boulevard Macdonald 75019 Paris";
  const firstName = "Aymen";
  const lastName = "BENAMOR";
  const phoneNumber = "0600000000";
  var userEmail = `user${Date.now()}test@papernest.com`;

  test('should complete the onboarding process', async ({ page }) => {
    await page.goto('https://app.papernest.com/onboarding?anonymous&anonymousId=test&id_text=1&destination=newspaper');
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.click('#popin-poste-classic');
    await page.click('#poste-subscription\\.begin_date');

    await page.click('[aria-label="30 mai 2024"]');

    await page.waitForTimeout(3000);
    await page.fill('#old_housing\\.address', ancienlogement);
    await page.click(`li:has-text("${ancienlogement}")`);
      
    await page.waitForTimeout(3000);
    await page.fill('#housing\\.address', nouveaulogement);
    await page.click(`li:has-text("${nouveaulogement}")`);
    
    
    await page.click('#button_next'); // Handle cookie banner
    await page.click('.banner-container__agree');

    await page.click('#offer_poste_6');

    

    await page.fill('#user\\.email', userEmail);
    await page.fill('#user\\.phone_number', phoneNumber);
    await page.click('#user\\.civility-mister');
    await page.fill('#user\\.first_name', firstName);
    await page.fill('#user\\.last_name', lastName);

    await page.waitForTimeout(3000); // Wait for the next button to become clickable
    await page.click('#button_next');


    //await page.waitForTimeout(3000);
    await page.click('#poste-subscription\\.confirmation_code_destination-post_office');

    await page.waitForTimeout(3000);
    await page.click('#button_next');

    await page.waitForTimeout(3000);
    await page.click('#button_next_summary');

  
    await expect(page.locator('#undefined > .title')).toHaveText("Il ne vous reste plus qu'à payer la redirection");
    

   
    await page.close();
  });
});