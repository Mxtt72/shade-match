"use client";

import { useMemo, useState } from 'react';
import { catalog, categories, finishes, type Product } from '@/lib/catalog';
import { getAverageColorFromImage, sortMatches } from '@/lib/color';

export default function ShadeMatchApp() {
  const [selectedColor, setSelectedColor] = useState('#D8A188');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [finish, setFinish] = useState<(typeof finishes)[number]>('All');
  const [maxPrice, setMaxPrice] = useState(140);
  const [saved, setSaved] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const rankedProducts = useMemo(() => {
    const filtered = catalog.filter((product) => {
      const categoryMatch = category === 'All' || product.category === category;
      const finishMatch = finish === 'All' || product.finish === finish;
      const priceMatch = product.price <= maxPrice;
      return categoryMatch && finishMatch && priceMatch;
    });

    return sortMatches(selectedColor, filtered).slice(0, 6) as Product[];
  }, [category, finish, maxPrice, selectedColor]);

  const savedProducts = useMemo(
    () => catalog.filter((product) => saved.includes(product.id)),
    [saved]
  );

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      if (!result) return;

      setImageSrc(result);
      setLoading(true);

      try {
        const extracted = await getAverageColorFromImage(result);
        setSelectedColor(extracted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const toggleSave = (productId: string) => {
    setSaved((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const handleSampleShade = () => {
    setSelectedColor('#D79D87');
    setImageSrc(null);
  };

  const matchesText = `${selectedColor} | ${rankedProducts[0]?.name ?? 'No match'} | ${rankedProducts[0]?.price ?? 0}`;

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(`Shade Match: ${selectedColor}. Best match: ${rankedProducts[0]?.name ?? 'No match'} — $${rankedProducts[0]?.price ?? 0}.`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F1EA] text-[#2B201E]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-full border border-[#E0D4CB] bg-white/60 px-6 py-4 shadow-luxe backdrop-blur-sm">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A6762]">Luxe shade intelligence</p>
            <h1 className="text-xl font-semibold">Lune Shade</h1>
          </div>
          <button
            onClick={copySummary}
            className="rounded-full border border-[#D8C2B4] bg-[#F9F4F0] px-4 py-2 text-sm font-medium text-[#2A221F] transition hover:bg-[#F2E6E0]"
          >
            Share Match
          </button>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.7fr]">
          <div className="rounded-[32px] border border-[#E8DCD2] bg-gradient-to-br from-[#F9F4F0] via-[#F3EAE4] to-[#EFE6DE] p-6 shadow-luxe">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#7D6A65]">Color match engine</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-[-0.06em] md:text-5xl">Find the exact shade behind the photo.</h2>
              </div>
              <button
                onClick={handleSampleShade}
                className="rounded-full border border-[#D9C3B8] bg-[#2F2723] px-5 py-3 text-sm font-medium text-[#F7F0EA] transition hover:opacity-90"
              >
                Use sample shade
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
              <label className="group flex min-h-[260px] cursor-pointer flex-col justify-between rounded-[28px] border border-dashed border-[#D1B6A8] bg-[#F6F0EC] p-5 transition hover:border-[#B98F7D] hover:bg-[#F8F3F0]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#7D6A65]">Upload photo</p>
                  <div className="mt-8 flex items-center justify-center rounded-[22px] border border-[#EADFD6] bg-white/60 p-8">
                    {imageSrc ? (
                      <img src={imageSrc} alt="Uploaded product" className="max-h-44 w-full rounded-[18px] object-cover" />
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3E7DF] text-2xl">◎</div>
                        <p className="text-lg font-medium">Take or upload a product photo</p>
                        <p className="mt-2 text-sm text-[#5F4E49]">Lip liner, eyeshadow, blush, or any beauty item</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-[#5B4C48]">Instant color extraction</span>
                  <span className="rounded-full bg-[#EDE2DB] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#4E3D38]">{loading ? 'Analyzing...' : 'Ready'}</span>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>

              <div className="rounded-[28px] border border-[#E7D7CF] bg-[#F5F0ED] p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#7D6A65]">Exact shade</p>
                <div className="mt-5 flex items-center gap-4">
                  <div className="h-20 w-20 rounded-[20px] border border-white/60 shadow-md" style={{ background: selectedColor }} />
                  <div>
                    <p className="text-2xl font-semibold tracking-[-0.05em]">{selectedColor}</p>
                    <p className="mt-2 text-sm text-[#5F4E49]">Closest luxury match ready</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3 text-sm text-[#4D413E]">
                  <div className="flex items-center justify-between rounded-2xl bg-white/60 px-3 py-2">
                    <span>Best match</span>
                    <strong>{rankedProducts[0]?.name ?? '—'}</strong>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white/60 px-3 py-2">
                    <span>Average price</span>
                    <strong>${Math.round(rankedProducts.reduce((sum, product) => sum + product.price, 0) / Math.max(rankedProducts.length, 1))}</strong>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white/60 px-3 py-2">
                    <span>Color family</span>
                    <strong>{rankedProducts[0]?.undertone ?? 'Neutral'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[30px] border border-[#E7D7CF] bg-[#F7F3F1] p-5 shadow-luxe">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#7D6A65]">Filter</p>
            <div className="mt-5 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#403837]">Product type</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((option) => (
                    <button
                      key={option}
                      onClick={() => setCategory(option)}
                      className={`rounded-full px-3 py-2 text-xs font-medium transition ${category === option ? 'bg-[#2B201E] text-white' : 'bg-white text-[#564A47]'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#403837]">Finish</label>
                <div className="flex flex-wrap gap-2">
                  {finishes.map((option) => (
                    <button
                      key={option}
                      onClick={() => setFinish(option)}
                      className={`rounded-full px-3 py-2 text-xs font-medium transition ${finish === option ? 'bg-[#2B201E] text-white' : 'bg-white text-[#564A47]'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#403837]">
                  <span>Max price</span>
                  <span>${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={140}
                  step={5}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="w-full accent-[#352B2A]"
                />
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[30px] border border-[#E8DCD2] bg-[#F9F4F0] p-5 shadow-luxe">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#7D6A65]">Best matches</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Luxury product recommendations</h3>
              </div>
              <span className="rounded-full bg-[#F2E3DA] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#564944]">{rankedProducts.length} results</span>
            </div>

            <div className="space-y-4">
              {rankedProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 rounded-[24px] border border-[#E7D7CF] bg-white p-3">
                  <div className="h-14 w-14 rounded-[18px] border border-[#E9DDD7] shadow-sm" style={{ background: product.hex }} />

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#7B6661]">{product.brand}</p>
                        <h4 className="mt-1 text-lg font-medium">{product.name}</h4>
                      </div>
                      <button
                        onClick={() => toggleSave(product.id)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${saved.includes(product.id) ? 'bg-[#2E2523] text-white' : 'bg-[#F2EAE4] text-[#3E2F2B]'}`}
                      >
                        {saved.includes(product.id) ? 'Saved' : 'Save'}
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#5D4E4A]">
                      <span>{product.category}</span>
                      <span>•</span>
                      <span>{product.finish}</span>
                      <span>•</span>
                      <span>{product.undertone}</span>
                      <span>•</span>
                      <span>{product.stock}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#7D6A65]">Price</p>
                    <p className="mt-1 text-xl font-semibold">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-[#E8DCD2] bg-[#F7F2EF] p-5 shadow-luxe">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#7D6A65]">Saved matches</p>
              <div className="mt-4 space-y-3">
                {savedProducts.length ? (
                  savedProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between rounded-[18px] border border-[#E7D7CF] bg-white p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-[12px] border border-[#E9DDD7]" style={{ background: product.hex }} />
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-[#6A564F]">{product.brand}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">${product.price}</span>
                    </div>
                  ))
                ) : (
                  <p className="rounded-[18px] border border-dashed border-[#DCC9C1] bg-[#F8F5F2] p-4 text-sm text-[#5D4945]">
                    Save colors you love to build your signature palette.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#E8DCD2] bg-[#221C1A] p-5 text-[#F6EFEA] shadow-luxe">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#CDB5A8]">Match summary</p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{selectedColor}</p>
              <p className="mt-4 text-sm text-[#DCCBC4]">
                {rankedProducts[0]?.name ?? 'No match yet'} — {rankedProducts[0]?.category ?? 'Awaiting color'}
              </p>
              <p className="mt-3 text-sm text-[#DCCBC4]">Best available price: ${rankedProducts[0]?.price ?? 0}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
