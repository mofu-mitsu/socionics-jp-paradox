const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `                            {isSending ? "送信中..." : "送信"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div> {"}`;

const replacement = `                            {isSending ? "送信中..." : "送信"}
                          </button>
                        </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div> {"}`;

content = content.replace(target, replacement);
fs.writeFileSync('app/page.tsx', content);
