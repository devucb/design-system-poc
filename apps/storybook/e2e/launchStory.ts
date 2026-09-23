export async function launchStory(id: string, testID: string) {
  await device.launchApp({
    newInstance: true,
    launchArgs: {detoxStory: id},
  });
  await waitFor(element(by.id(testID)))
    .toBeVisible()
    .withTimeout(20000);
}
