import examples from '../examples.json' with { type: 'json' };

for (const component of examples.components) {
  console.log(component);

  for (const [framework, config] of Object.entries(examples.frameworks)) {
    const starters = config.starters.length > 0 ? config.starters.join(', ') : config.status;
    console.log(`  ${framework}: ${starters}`);
  }
}
