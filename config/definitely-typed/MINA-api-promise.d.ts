namespace "MINAApi" {

  export type MINAMergedAPI = MINANetAPIAsync & MINAMediaAPIAsync & MINAStorageAPIAsync & MINALocationAPIAsync & MINADeviceAPIAsync & MINAUIAPIAsync & MINAOpenAPIAsync;

  interface MINANetAPIAsync {
    requestAsync(obj: {
      url: string, data?: Object|string;
      header?: Object;
      method?: string;
    });
    downloadFileAsync(obj: {
      url: string;
      header?: Object;
      then?: {
        res: {
          tempFilePath: string
        }
      };
    });
    uploadFileAsync(obj: {
      url: string;
      filePath: string;
      name: string;
      header?: Object;
      formData?: Object;
    });
    connectSocketAsync(obj: {
      url: string;
      data?: Object;
      header?: Object;
      method?: string;
    });
    onSocketOpen(cb: (data: any) => void);
    onSocketError(cb: (data: any) => void);
    sendSocketMessageAsync(obj: {data: string|ArrayBuffer});
    onSocketMessage(callback: (data: string|ArrayBuffer) => void);
    closeSocket();
    onSocketClose(cb: (data: any) => void);
  }

  interface MINAMediaAPIAsync {
    chooseImageAsync(obj: {
      count?: number;
      sizeType?: string[];
      sourceType?: string[];
      then?: (res: {tempFilePaths: string[], [propName: string]: any}) => void;
    }): Promise;
    previewImageAsync(obj: {
      current?: string;
      urls: string[];
    });
    getImageInfoAsync(obj: {
      src: string;
      then?: (res: {width: number, height: number, [propName: string]: any}) => void;
    });
    startRecordAsync(obj: {
      then?: (res: {tempFilePath: string, [propName: string]: any}) => void;
    });
    stopRecord();

    playVoiceAsync(obj: {filePath: string});
    pauseVoice();
    stopVoice();

    getBackgroundAudioPlayerStateAsync(obj: {
      then?: (res: {duration: number, currentPostion: number, status: number, downloadPercent: number, dataUrl: string, [propName: string]: any}) => void;
    });
    playBackgroundAudioAsync(obj: {dataUrl: string, title?: string, coverImgUrl?: string});
    pauseBackgroundAudio();
    seekBackgroundAudioAsync(obj: {position: number});
    stopBackgroundAudio();
    onBackgroundAudioPlay(cb: (data: any) => void);
    onBackgroundAudioPause(cb: (data: any) => void);
    onBackgroundAudioStop(cb: (data: any) => void);

    saveFileAsync(obj: {
      tempFilePath: string,
      then?: (res: {savedFilePath: string, [propName: string]: any}) => void;
    });
    getSavedFileListAsync(obj: {
      then?: (res: {errMsg: string, fileList: {filePath: string, createTime: number, size: number, [propName: string]: any}[]}) => void;
    });
    getSavedFileInfoAsync(obj: {
      filePath: string;
      then?: (res: {errMsg: string, createTime: number, size: number, [propName: string]: any}) => void;
    });
    removeSavedFileAsync(obj: {
      filePath: string;
      then?: (res: {errMsg: string, fileList: {filePath: string, createTime: number, size: number, [propName: string]: any}[]}) => void;
    });

    chooseVideoAsync(obj: {
      sourceType?: string[];
      maxDuration?: number;
      camera?: string[];
    }): {
      tempFilePath: string;
      duration: number;
      size: number;
      height: number;
      width: number;
    };
    createAudioContext(audioId: string): {
      setSrc(src: string);
      play();
      pause();
      seek(position: number);
    };
    createVideoContext(vedioId: string): {
      play();
      pause();
      seek(position: number);
      sendDanmu(danmu: {text: string, color: string})
    };
  }

  interface MINAStorageAPIAsync {
    setStorageAsync(obj: {key: string, data: Object|string});
    setStorageSync(key: string, data: Object|string);
    getStorageAsync(obj: {
      key: string;
      then?: (res: {data: any, [propName: string]: any}) => void;
    });
    getStorageSync(key: string): any;
    getStorageInfoAsync(obj: {
      then?: (res: {keys: string[], currentSize: number, limitSize: number, [propName: string]: any}) => void;
    });
    getStorageInfoSync(): {keys: string[], currentSize: number, limitSize: number};
    removeStorageAsync(obj: {
      key: string;
      then?: (res: {data: any, [propName: string]: any}) => void;
    });
    removeStorageSync(key: string);
    clearStorage();
    clearStorageSync();
  }

  interface mapContext {
    getCenterLocation(obj);
    moveToLocation();
  }


  interface MINALocationAPIAsync {
    getLocationAsync(obj: {
      type: string;
      then?: (res: {latitude: number, longitude: number, speed: number, accuracy: number, [propName: string]: any}) => void;
    });
    chooseLocationAsync(obj: {
      type: string;
      then?: (res: {latitude: number, longitude: number, speed: number, accuracy: number, [propName: string]: any}) => void;
    });
    openLocationAsync(obj: {
      latitude: number;
      longitude: number;
      scale?: number;
      name?: string;
      address?: string;
    });
    createMapContext(): mapContext;
  }

  interface MINADeviceAPIAsync {
    getNetworkTypeAsync(obj: {
      then?: (res: {networkType: string, [propName: string]: any}) => void
    });
    getSystemInfoAsync(obj: {
      then?: (res: {
        model: string;
        pixelRatio: number;
        windowWidth: number;
        windowHeight: number;
        language: string;
        version: string;
        system: string;
        platform: string;
      }) => void
    });
    getSystemInfoSync(): {
      model: string;
      pixelRatio: number;
      windowWidth: number;
      windowHeight: number;
      language: string;
      version: string;
      system: string;
      platform: string;
    };
    onAccelerometerChange(cb: (res: {x: number, y: number, z: number, [propName: string]: any}) => void);
    onCompassChange(cb: (res: {direction: number, [propName: string]: any}) => void);
    makePhoneCallAsync(obj: {phoneNumber: string});
    scanCodeAsync();
  }

  interface MINAAnimation {
    opacity(value: number): MINAAnimation;
    backgroundColor(color: string): MINAAnimation;
    width(length: number): MINAAnimation;
    height(length: number): MINAAnimation;
    top(length: number): MINAAnimation;
    left(length: number): MINAAnimation;
    bottom(length: number): MINAAnimation;
    right(length: number): MINAAnimation;

    rotate(deg: number): MINAAnimation;
    rotateX(deg: number): MINAAnimation;
    rotateY(deg: number): MINAAnimation;
    rotateZ(deg: number): MINAAnimation;
    rotate3d(deg: number, x: number, y: number, z: number): MINAAnimation;

    scale(sx: number, sy?: number): MINAAnimation;
    scaleX(sx: number): MINAAnimation;
    scaleY(sy: number): MINAAnimation;
    scaleZ(sz: number): MINAAnimation;
    scale3d(sx: number, sy: number, sz: number): MINAAnimation;

    translate(tx: number, ty?: number): MINAAnimation;
    translateX(tx: number): MINAAnimation;
    translateY(ty: number): MINAAnimation;
    translateZ(tz: number): MINAAnimation;
    translate3d(tx: number, ty: number, tz: number): MINAAnimation;
    skew(ax: number, ay?: number): MINAAnimation;
    skewX(ax: number): MINAAnimation;
    skewY(ay: number): MINAAnimation;

    matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): MINAAnimation;
    matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): MINAAnimation;

    step();
  }

  interface MINAContext {
    setFillStyle(color: string);
    setStrokeStyle(color: string);
    setShadow(offsetX: number, offsetY: number, blur: number, color: string);
    createLinearGradient(x0: number, y0: number, x1: number, y1: number);
    createCircularGradient(x: number, y: number, r: number);
    addColorStop(stop: number, color: string);
    setLineWidth(lineWidth: number);
    setLineCap(lineCap: string);
    setLineJoin(lineJoin: string);
    setMiterLimit(miterLimit: number);
    rect(x: number, y: number, width: number, height: number);
    fillRect(x: number, y: number, width: number, height: number);
    strokeRect(x: number, y: number, width: number, height: number);
    clearRect(x: number, y: number, width: number, height: number);
    fill();
    stroke();
    beginPath();
    closePath();
    moveTo(x: number, y: number);
    lineTo(x: number, y: number);
    arc(x: number, y: number, radius: number, startAngle: number, sweepAngle: number, counterclockwise?: boolean);
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number);
    scale(scaleWidth: number, scaleHeight: number);
    rotate(degree: number);
    translate(x: number, y: number);
    setFontSize(fontSize: number);
    fillText(x: number, y: number, text: string);
    drawImage(imageResource: string, x: number, y: number, width: number, height: number);
    setGlobalAlpha(alpha: number);
    save();
    restore();
    draw(reserve?: boolean);
    getActions(): any;
    clearActions();
  }

  interface MINAUIAPIAsync {
    showToastAsync(obj: {
      title: string;
      icon?: string;
      duration?: number;
      mask?: boolean;
    });
    hideToast();
    showModalAsync(obj: {
      title: string;
      content: string;
      showCancel?: boolean;
      cancelText?: string;
      cancelColor?: string;
      confirmText?: string;
      confirmColor?: string;
      then?: (res: {confirm: number, [propName: string]: any}) => void;
    });
    showActionSheetAsync(obj: {
      itemList: string[];
      itemColor?: string;
      then?: (res: {tabIndex: number, cancel: boolean, [propName: string]: any}) => void;
    });

    setNavigationBarTitleAsync(obj: {title: string});
    showNavigationBarLoading();
    hideNavigationBarLoading();

    navigateToAsync(obj: {url: string});
    redirectToAsync(obj: {url: string});
    switchTabAsync(obj: {url: string});
    navigateBack(obj: {delta: number});

    createAnimation(obj: {
      duration?: number;
      timingFunction?: string;
      delay?: number;
      transformOrigin?: string;
    }): MINAAnimation;

    createCanvasContext(canvasId: string): MINAContext;
    drawCanvas(obj: {canvasId: string, actions: any[], reserve?: boolean});
    canvasToTempFilePath(obj: {canvasId: string});

    hideKeyboard();
    stopPullDownRefresh();
  }

  interface MINAOpenAPIAsync {
    loginAsync(obj: {
      then?: (res: {errMsg: string, code: string, [propName: string]: any}) => void
    });
    checkSessionAsync();

    getUserInfoAsync(obj: {
      then?: (res: {userInfo: Object, rawData: string, signature: string, encryptedData: string, iv: string, [propName: string]: any}) => void
    });

    requestPaymentAsync(obj: {
      timeStamp: number;
      nonceStr: string;
      package: string;
      signType: string;
      paySign: string;
    });
  }

  interface MINAPageObj {
    data?: Object;
    onLoad?: Function;
    onReady?: Function;
    onShow?: Function;
    onHide?: Function;
    onUnload?: Function;
    onPullDownRefresh?: Function;
    onReachBottom?: Function;
    onShareAppMessage?(obj: {
      title: string,
      desc: string,
      path: string,
    });
    [propName: string]: any;
  }

  interface MINAAppObj {
    onLaunch?: Function;
    onShow?: Function;
    onHide?: Function;
    onError?: Function;
    [propName: string]: any;
  }

  interface IPage {
    (obj: MINAPageObj): void;
    setData(obj: Object);
    forceUpdate();
    update();
  }

  interface IApp {
    (obj: MINAAppObj): void;
    globalData: any;
  }

  // 微信的文档太弱了，这块儿没有说明
  interface MINAGetAppObj {
    globalData: any;
    [propName: string]: any;
    getUserInfo(cb: (userInfo: Object) => void);
    getCurrentPage(): IPage;
  }


  export let wx: MINAMergedAPI;
  export let Page: IPage;

  export function App(obj: MINAAppObj);

  export function getApp(): MINAGetAppObj;

  export function getCurrentPages(): any[];
}

export let wx;
export let Page;
export function App();
export function getApp();
export function getCurrentPages(): any[];
