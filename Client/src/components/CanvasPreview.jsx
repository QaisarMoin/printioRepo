import { useRef, useEffect } from 'react';

export default function CanvasPreview({ productImage, customText, customImageUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Draw background
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, W, H);

    // Draw product base image
    const drawOverlays = () => {
      // Custom uploaded image (bottom layer after product)
      if (customImageUrl) {
        const userImg = new Image();
        userImg.crossOrigin = 'anonymous';
        userImg.onload = () => {
          const size = Math.min(W, H) * 0.4;
          ctx.globalAlpha = 0.85;
          ctx.drawImage(userImg, W / 2 - size / 2, H / 2 - size / 2, size, size);
          ctx.globalAlpha = 1;
          drawText();
        };
        userImg.onerror = drawText;
        userImg.src = customImageUrl;
      } else {
        drawText();
      }
    };

    const drawText = () => {
      if (customText && customText.trim()) {
        ctx.save();
        const fontSize = Math.max(16, Math.min(28, W / 12));
        ctx.font = `bold ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // shadow
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 4;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(customText, W / 2, H - 40);
        ctx.restore();
      }
    };

    if (productImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Cover-fit
        const scale = Math.max(W / img.width, H / img.height);
        const dx = (W - img.width * scale) / 2;
        const dy = (H - img.height * scale) / 2;
        ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
        drawOverlays();
      };
      img.onerror = () => {
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Product Preview', W / 2, H / 2);
        drawOverlays();
      };
      img.src = productImage;
    } else {
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#9ca3af';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Product Preview', W / 2, H / 2);
      drawOverlays();
    }
  }, [productImage, customText, customImageUrl]);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Live Preview</p>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="rounded-xl border-2 border-dashed border-brand-200 shadow-sm w-full max-w-md"
        style={{ maxHeight: '300px' }}
      />
    </div>
  );
}
